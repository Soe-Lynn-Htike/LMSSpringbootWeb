/**
 * 
 */
package com.gcit.lms.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gcit.lms.dao.AuthorDAO;
import com.gcit.lms.dao.BookCopiesDAO;
import com.gcit.lms.dao.BookDAO;
import com.gcit.lms.dao.BookLoanDAO;
import com.gcit.lms.dao.BorrowerDAO;
import com.gcit.lms.dao.BranchDAO;
import com.gcit.lms.dao.GenreDAO;
import com.gcit.lms.dao.PublisherDAO;
import com.gcit.lms.entity.Author;
import com.gcit.lms.entity.Book;
import com.gcit.lms.entity.BookLoan;
import com.gcit.lms.entity.Borrower;
import com.gcit.lms.entity.Branch;
import com.gcit.lms.entity.Genre;
import com.gcit.lms.entity.Publisher;

/**
 * @author Aaron
 *
 */
@RestController
public class AdminService extends BaseController {

	@Autowired
	AuthorDAO adao;

	@Autowired
	BookDAO bookdao;

	@Autowired
	GenreDAO genredao;

	@Autowired
	PublisherDAO publisherdao;

	@Autowired
	BookCopiesDAO bookCopiesdao;

	@Autowired
	BorrowerDAO borrowerdao;

	@Autowired
	BranchDAO branchdao;

	@Autowired
	BookLoanDAO bookloandao;

	// update author

	@RequestMapping(value="initAuthor", method=RequestMethod.GET, produces="application/json" )
	public Author initAuthor() throws SQLException {
		return new Author();
	}
	
	@RequestMapping(value = "updateAuthor", method = RequestMethod.POST, consumes = "application/json")
	@Transactional
	public void updateAuthor(@RequestBody Author author) throws SQLException {

		try {
			if (author.getAuthorId() != null && author.getAuthorName() != null) {
				adao.updateAuthor(author);
				adao.saveAuthorBook(author);
			} else if (author.getAuthorId() == null && author.getAuthorName() != null) {
				Integer authorId = adao.createAuthorWithPK(author);
				author.setAuthorId(authorId);
				adao.saveAuthorBook(author);
			} else {
				adao.deleteAuthor(author);
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(); // log your stacktrace
			// display a meaningful user
		}
	}

	@RequestMapping(value = "updateAuthorBook", method = RequestMethod.POST, consumes = "application/json")
	@Transactional
	public void updateAuthorBook(@RequestBody Author author) throws SQLException {

		try {
				adao.deleteAuthorBook(author);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(); // log your stacktrace
			// display a meaningful user
		}
	}
	
	@RequestMapping(value = "readAuthors", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public List<Author> readAllAuthors() {
		List<Author> authors = new ArrayList<>();
		try {
			authors = adao.readAuthors();
			for (Author a : authors) {
				a.setBooks(bookdao.readBooksByAuthorId(a));
			}
			return authors;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "readAuthorsByName/{searchString}", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public List<Author> searchAuthorsByName(@PathVariable String searchString) {
		List<Author> authors = new ArrayList<>();
		try {
			authors = adao.readAuthorsByName(searchString);
			for (Author a : authors) {
				a.setBooks(bookdao.readBooksByAuthorId(a));
			}
			return authors;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value = "readAuthorsById/{Id}", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public Author readAuthorsById(@PathVariable String Id) {
		  Author author  = new Author();
		try {
			author = adao.readAuthorsById(Integer.parseInt(Id));
			
			author.setBooks(bookdao.readBooksByAuthorId(author));
			
			return author;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value="initBook", method=RequestMethod.GET, produces="application/json" )
	public Book initBook() throws SQLException {
		return new Book();
	}
	// update book
	@RequestMapping(value = "updateBook", method = RequestMethod.POST, consumes = "application/json")
	@Transactional
	public void updateBook(@RequestBody Book book) throws SQLException {

		try {
			if (book.getBookId() != null && book.getTitle() != null) {
				bookdao.updateBook(book);
				bookdao.saveBookAuthor(book);
				bookdao.saveBookGenre(book);

			} else if (book.getBookId() == null && book.getTitle() != null && book.getPublisherId()!= null) {
				// bdao.createBook(book);
				Integer bookId = bookdao.createBookWithPK(book);
				book.setBookId(bookId);
				//bookdao.updateBookByPublisherId(book);
				bookdao.saveBookAuthor(book);
				bookdao.saveBookGenre(book);
				// add to book genre
				// add to publisher
			} else {
				bookdao.deleteBook(book);
			}

		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "readBooks", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public List<Book> readBooks() throws SQLException {
		List<Book> books = new ArrayList<>();
		try {

			books = bookdao.readBooks("");
			for (Book b : books) {
				b.setAuthors(adao.readAuthorsByBookId(b));
				b.setGenres(genredao.getGenresByBookId(b));
				b.setPublisher(publisherdao.getPublisherbyBookId(b));
				b.setBookcopies(bookCopiesdao.getBookCopiesByBookId(b));
			}

			return books;

		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	// read book by title
	@RequestMapping(value = "readBooksByTitle/{searchTitle}", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public List<Book> readBooksByTitle(@PathVariable String searchTitle) throws SQLException {
		List<Book> books = new ArrayList<>();
		try {
			books = bookdao.readBooks(searchTitle);
			for (Book book : books) {
				book.setAuthors(adao.readAuthorsByBookId(book));
				book.setGenres(genredao.getGenresByBookId(book));
				book.setPublisher(publisherdao.getPublisherbyBookId(book));
				book.setBookcopies(bookCopiesdao.getBookCopiesByBookId(book));
			}
			return books;

		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value = "readBookById/{searchId}", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public Book readBookById(@PathVariable String searchId) throws SQLException {
		Book book = new Book();
		try {
			book = bookdao.getBookByPK(Integer.parseInt(searchId));
				book.setAuthors(adao.readAuthorsByBookId(book));
				book.setGenres(genredao.getGenresByBookId(book));
				book.setPublisher(publisherdao.getPublisherbyBookId(book));
				book.setBookcopies(bookCopiesdao.getBookCopiesByBookId(book));
			return book;

		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	
	
	@RequestMapping(value = "updateBookAuthorGenre", method = RequestMethod.POST, consumes = "application/json")
	@Transactional
	public void updateBookAuthorGenre(@RequestBody Book book) throws SQLException {

		try {
				bookdao.deleteAuthorGenre(book);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(); // log your stacktrace
			// display a meaningful user
		}
	}

	
	@RequestMapping(value="initPublisher", method=RequestMethod.GET, produces="application/json" )
	public Publisher initPublisher() throws SQLException {
		return new Publisher();
	}
	
	// update Publisher
	@RequestMapping(value = "updatePublisher", method = RequestMethod.POST, consumes = "application/json")
	@Transactional
	public void updatePublisher(@RequestBody Publisher publisher) throws SQLException {

		try {
			if (publisher.getPublisherId() != null && publisher.getPublisherName() != null
					&& publisher.getPublisherAddress() != null && publisher.getPublisherPhone() != null) {
				publisherdao.updatePublisher(publisher);
			} else if (publisher.getPublisherId() == null && publisher.getPublisherName() != null
					&& publisher.getPublisherAddress() != null && publisher.getPublisherPhone() != null) {
				publisherdao.createPublisher(publisher);
			} else {
				publisherdao.deletePublisher(publisher);
			}
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
		}
	}

	// read Publisher
	@RequestMapping(value = "readPublishers", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public List<Publisher> readPublisher() throws SQLException {
		List<Publisher> publishers = new ArrayList<>();
		try {
			publishers = publisherdao.readPublishers("");
			for (Publisher p : publishers) {
				p.setBooks(bookdao.readBooksByPublisherId(p));
			}
			return publishers;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value = "readPublishersWithoutBook", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public List<Publisher> readPublishersWithoutBook() throws SQLException {
		List<Publisher> publishers = new ArrayList<>();
		try {
			publishers = publisherdao.readPublishersWithoutBook();
			return publishers;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "readPublisherByName/{searchPublisher}", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public List<Publisher> readPublisher(@PathVariable String searchPublisher) throws SQLException {
		List<Publisher> publishers = new ArrayList<>();
		try {
			publishers = publisherdao.readPublishers(searchPublisher);
			for (Publisher p : publishers) {
				p.setBooks(bookdao.readBooksByPublisherId(p));
			}
			return publishers;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value = "readPublisherById/{searchPublisher}", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public Publisher readPublisherById(@PathVariable String searchPublisher) throws SQLException {
		Publisher publisher = new Publisher();
		try {
			publisher = publisherdao.getPublisherById(Integer.parseInt(searchPublisher));
			
			publisher.setBooks(bookdao.readBooksByPublisherId(publisher));
			return publisher;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value="initGenre", method=RequestMethod.GET, produces="application/json" )
	public Genre initGenre() throws SQLException {
		return new Genre();
	}
	
	// update Genre
	@RequestMapping(value = "updateGenre", method = RequestMethod.POST, consumes = "application/json")
	@Transactional
	public void updateGenre(@RequestBody Genre genre) throws SQLException {
		try {
			if (genre.getGenre_id() != null && genre.getGenre_name() != null) {
				genredao.updateGenre(genre);
				genredao.saveGenreBook(genre);
			} else if (genre.getGenre_id() == null && genre.getGenre_name() != null) {
				Integer genreId = genredao.createGenreWithPK(genre);
				genre.setGenre_id(genreId);
				genredao.saveGenreBook(genre);
			} else {
				genredao.deleteGenre(genre);
			}
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	// read Genre

	@Transactional
	@RequestMapping(value = "readGenres", method = RequestMethod.GET, produces = "application/json")
	public List<Genre> readGenres() throws SQLException {
		List<Genre> genres = new ArrayList<>();
		try {
			genres = genredao.readGenres("");
			for (Genre g : genres) {
				g.setBooks(bookdao.readBooksByGenreId(g));
			}
			return genres;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;

	}

	@RequestMapping(value = "readGenreByName/{searchGenre}", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public List<Genre> readGenreByName(@PathVariable String searchGenre) throws SQLException {
		List<Genre> genres = new ArrayList<>();
		try {
			genres = genredao.readGenres(searchGenre);
			for (Genre g : genres) {
				g.setBooks(bookdao.readBooksByGenreId(g));
			}
			return genres;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;

	}
	
	@RequestMapping(value = "readGenreById/{searchGenre}", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public Genre readGenreById(@PathVariable String searchGenre) throws SQLException {
		Genre genre = new Genre();
		try {
			genre = genredao.readGenreById(Integer.parseInt(searchGenre));
			genre.setBooks(bookdao.readBooksByGenreId(genre));
		
			return genre;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;

	}
	
	@RequestMapping(value = "updateGenreBook", method = RequestMethod.POST, consumes = "application/json")
	@Transactional
	public void updateGenreBook(@RequestBody Genre genre) throws SQLException {
		try {
			genredao.deleteGenreBook(genre);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(); // log your stacktrace
			// display a meaningful user
		}
	}
	
	@RequestMapping(value="initBorrower", method=RequestMethod.GET, produces="application/json" )
	public Borrower initBorrower() throws SQLException {
		return new Borrower();
	}

	// update Borrower
	@RequestMapping(value = "updateBorrower", method = RequestMethod.POST, consumes = "application/json")
	@Transactional
	public void updateBorrower(@RequestBody Borrower borrower) throws SQLException {
		try {
			if (borrower.getCardNo() != null && borrower.getName() != null && borrower.getAddress() != null
					&& borrower.getPhone() != null) {
				borrowerdao.updateBorrower(borrower);
			} else if (borrower.getCardNo() == null && borrower.getName() != null && borrower.getAddress() != null
					&& borrower.getPhone() != null) {
				borrowerdao.createBorrower(borrower);
			} else {
				borrowerdao.deleteBorrower(borrower);
			}
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
		}
	}

	// read Borrower
	@RequestMapping(value = "readBorrowers", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public List<Borrower> readBorrower() throws SQLException {
		List<Borrower> borrowers = new ArrayList<>();
		try {
			borrowers = borrowerdao.readBorrowers("");
			for (Borrower b : borrowers) {
				b.setBookLoans(bookloandao.getBookLoansByCardNo(b));
			}
			return borrowers;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "readBorrowerByCardNo/{cardNo}", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public Borrower readBorrowerByCardNo(@PathVariable String cardNo) throws SQLException {
		Borrower borrower = new Borrower();
		try {
			borrower = borrowerdao.readBorrowersByCardNo(Integer.parseInt(cardNo));
			borrower.setBookLoans(bookloandao.getBookLoansByCardNo(borrower));
			return borrower;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "readBorrowerByName/{searchName}", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public List<Borrower> readBorrowerByName(@PathVariable String searchName) throws SQLException {
		List<Borrower> borrwers = new ArrayList<>();
		try {
			borrwers = borrowerdao.readBorrowers(searchName);
			for (Borrower b : borrwers) {
				b.setBookLoans(bookloandao.getBookLoansByCardNo(b));
			}
			return borrwers;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value="initBranch", method=RequestMethod.GET, produces="application/json" )
	public Branch initBranch() throws SQLException {
		return new Branch();
	}
	
	// Library Branch
	@RequestMapping(value = "updateBranch", method = RequestMethod.POST, consumes = "application/json")
	@Transactional
	public void updateBranch(@RequestBody Branch branch) throws SQLException {
		try {
			if (branch.getBranchId() != null && branch.getBranchName() != null && branch.getBranchAddress() != null) {
				branchdao.updateBranch(branch);
			} else if (branch.getBranchId() == null && branch.getBranchName() != null
					&& branch.getBranchAddress() != null) {
				branchdao.createBranch(branch);
			} else {
				branchdao.deleteBranch(branch);
			}

		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	// read Branch
	@RequestMapping(value = "readBranches", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public List<Branch> readBranches() throws SQLException {

		List<Branch> branches = new ArrayList<>();
		try {
			branches = branchdao.readBranches("");
			for (Branch branch : branches) {
				branch.setBookcopies(bookCopiesdao.getBookCopiesByBranch(branch));
			}
			return branches;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "readBranchByName/{searchBranchName}", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public List<Branch> readBranchByName(@PathVariable String searchBranchName) throws SQLException {
		List<Branch> branches = new ArrayList<>();
		try {
			branches = branchdao.readBranches(searchBranchName);
			for (Branch branch : branches) {
				branch.setBookcopies(bookCopiesdao.getBookCopiesByBranch(branch));
			}
			return branches;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value = "readBranchById/{searchBranch}", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public Branch readBranchById(@PathVariable String searchBranch) throws SQLException {
		Branch branch = new Branch();
		try {
			branch = branchdao.readBranchById(Integer.parseInt(searchBranch));
			branch.setBookcopies(bookCopiesdao.getBookCopiesByBranch(branch));
			
			return branch;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	// Book Loan
	@RequestMapping(value = "updateBookLoan", method = RequestMethod.POST, consumes = "application/json")
	@Transactional
	public void updateBookLoan(@RequestBody BookLoan bookLoan) throws SQLException {

		try {

			if (bookLoan.getBookId() != null && bookLoan.getBranchId() != null && bookLoan.getCardNo() != null
					&& bookLoan.getDateIn() == null) {
				bookloandao.creatBookLoan(bookLoan);
			} else if (bookLoan.getBookId() == null && bookLoan.getBranchId() == null && bookLoan.getCardNo() == null
					&& bookLoan.getDateIn() != null) {
				bookloandao.updateBookLoan(bookLoan);
			} else {
				bookloandao.deleteBookLoan(bookLoan);
			}

		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		}
	}
	
	@RequestMapping(value = "readBranchByBorrower/{cardNo}", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public List<Branch> readBranchByBorrower(@PathVariable String cardNo) throws SQLException {
		List<Branch> branches = new ArrayList<>();
		try {
			branches = branchdao.readBranchByBorrower(Integer.parseInt(cardNo));
			
			return branches;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value = "readBookByBorrower/{cardNo}", method = RequestMethod.GET, produces = "application/json")
	@Transactional
	public List<Book> readBookByBorrower(@PathVariable String cardNo) throws SQLException {
		List<Book> books = new ArrayList<>();
		try {
			books = bookdao.readBooksByBorrower(Integer.parseInt(cardNo));
			
			return books;
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value="initBookLoan", method=RequestMethod.GET, produces="application/json" )
	public BookLoan initBookLoan() throws SQLException {
		return new BookLoan();
	}
	
	
	@RequestMapping(value = "getBooksByBranchByCardNo", method = RequestMethod.POST, consumes = "application/json")
	@Transactional
	public List<Book> getBooksByBranchByCardNo(@RequestBody BookLoan bookLoan) throws SQLException {
		List<Book> books = new ArrayList<>();
		try {
			books = bookdao.readBookByBranchByCardNo(bookLoan);
			return books;
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	// override Book Loan Due Date
	@RequestMapping(value = "overrideBookLoanDueDate", method = RequestMethod.POST, consumes = "application/json")
	@Transactional
	public void overrideBookLoanDueDate(@RequestBody BookLoan bookLoan) throws SQLException {

		try {

			bookloandao.overrideDueDate(bookLoan);

		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();

		}
	}

	@RequestMapping(value = "updateBookLoanDueDate", method = RequestMethod.POST, consumes = "application/json")
	@Transactional
	public void updateBookLoanDueDate(@RequestBody BookLoan bookLoan) throws SQLException {

		try {
			bookloandao.updateBookLoanDueDate(bookLoan);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}

}
