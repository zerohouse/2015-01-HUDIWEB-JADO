package jado.service;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import core.exception.NotExistFileException;
import core.jadopay.PaymentDao;
import core.util.Upload;
import jado.dao.ArticleDao;
import jado.dao.BoardDao;
import jado.dao.CategoryDao;
import jado.dao.ProductDao;
import jado.dao.ShopDao;
import jado.dao.UserDao;
import jado.model.Article;
import jado.model.Board;
import jado.model.Category;
import jado.model.Customer;
import jado.model.FileInfo;
import jado.model.PaymentWithProduct;
import jado.model.Product;
import jado.model.Seller;
import jado.model.Shop;

@Service
@Transactional
public class ShopService {
	private static final Logger logger = LoggerFactory.getLogger(ShopService.class);

	@Autowired
	private ShopDao shopDao;
	@Autowired
	private BoardDao boardDao;
	@Autowired
	private CategoryDao categoryDao;
	@Autowired
	private ProductDao productDao;
	@Autowired
	private UserDao userDao;
	@Autowired
	private Upload upload;
	@Autowired
	private PaymentDao paymentDao;
	@Autowired
	private ArticleDao articleDao;

	public Shop settingById(String userId) {
		if (userId == null) {
			return null;
		}
		Seller seller = userDao.selectSellerById(userId);
		if (seller == null) {
			return null;
		}
		return getShopByUrl(seller.getShopUrl());
	}

	public Shop getShopByUrl(String url, String userId) {
		Shop shop = getShopByUrl(url);
		Seller seller = userDao.selectSellerByUrl(url);
		if (userId != null) {
			shop.setIsMyShop(userId.equals(seller.getId()));
		}
		return shop;
	}

	private Shop getShopByUrl(String url) {
		Shop shop = shopDao.selectByUrl(url);
		shop.setBoards(boardDao.selectAllByUrl(shop.getUrl()));
		shop.setCategorys(categoryDao.selectAllByUrl(shop.getUrl()));
		return shop;
	}
	
	
	public Shop getShopByCategoryId(int categoryId, String userId) {
		Shop shop = shopDao.getShopByCategoryId(categoryId);
		shop.setBoards(boardDao.selectAllByUrl(shop.getUrl()));
		shop.setCategorys(categoryDao.selectAllByUrl(shop.getUrl()));
		setIsMyShop(userId, shop);
		return shop;
	}

	private void setIsMyShop(String userId, Shop shop) {
		if (userId != null) {
			Seller seller = userDao.selectSellerByUrl(shop.getUrl());
			shop.setIsMyShop(userId.equals(seller.getId()));
		}
	}

	public Shop settingEditInfo(Shop shopFromClient) {
		Shop shop = shopDao.selectByUrl(shopFromClient.getUrl());
		if (shop.updateFromSettingPage(shopFromClient)) {
			shopDao.updateInfo(shop);
		}
		return shop;
	}

	public void settingEditImage(FileInfo fileInfo) throws IllegalStateException, IOException, NotExistFileException {
		String url = fileInfo.getUrl();
		upload.uploadFile(fileInfo.getFile(), fileInfo.getLocalLocation());

		Shop shop = shopDao.selectByUrl(url);
		shop.setUrl(url);
		shopDao.updateImageUrl(fileInfo);
	}

	public void boardDelete(Board board) {
		int countOfArticle = boardDao.countArticles(board.getId());
		if (countOfArticle == 0) {
			boardDao.remove(board.getId());
		} else {
			logger.debug(" article을 " + countOfArticle + "개 삭제하세요!");
		}
	}

	public void boardInsert(List<String> boards, String shopUrl) {
		for (String boardName : boards) {
			// TODO boardName 이 같으면, null이면 어떻게 할까? client 에서 확인합시다
			boardDao.insert(new Board(shopUrl, boardName));
		}
	}

	public void categoryDelete(Category category) {
		int countOfArticle = categoryDao.countProduct(category.getId());
		if (countOfArticle == 0) {
			categoryDao.remove(category.getId());
		} else {
			logger.debug(" product :" + countOfArticle + "개를 삭제하세요!");
		}
	}

	public void categoryInsert(List<String> categorys, String shopUrl) {
		for (String categoryName : categorys) {
			// TODO boardName 이 같으면, null이면 어떻게 할까? client 에서 확인합시다
			categoryDao.insert(new Category(categoryName, shopUrl));
		}
	}

	public List<Product> settingProductByUrl(String url) {
		List<Product> products = productDao.selectAllByUrl(url);
		logger.debug("products {}", products);
		return products;
	}

	public String getUrl(String userId) {
		if (userId == null) {
			return null;
		}
		Seller seller = userDao.selectSellerById(userId);
		if (seller == null) {
			return null;
		}
		return seller.getShopUrl();
	}

	public Customer getMyInfo(String url, String userId) {
		return userDao.selectUserById(userId);
	}

	public List<PaymentWithProduct> getPayments(Customer customer, String url) {
		logger.debug("user {}", customer.getId());
		Seller seller = userDao.selectSellerByUrl(url);
		logger.debug("seller", seller);
		List<PaymentWithProduct> payments = null;
		if (isSeller(customer, seller)) {
			payments = paymentDao.selectAll(url);
		} else {
			payments = paymentDao.selectAll(customer.getId(), url);
		}
		return payments;

	}

	private boolean isSeller(Customer customer, Seller seller) {
		if (seller == null)
			return false;
		return customer.getId().equals(seller.getId());
	}

	public Integer getPaymentsTotal(List<PaymentWithProduct> payments) {
		int result = 0;
		for (PaymentWithProduct paymentWithProduct : payments) {
			paymentWithProduct.setAmount();
			result += paymentWithProduct.getRealPrice();
		}
		return result;
	}

	public void settingEditTheme(int theme, String userId) {
		shopDao.setTheme(theme, userId);

	}

	public Category getCategory(int categoryId) {
		return categoryDao.selectByPk(categoryId);
	}

	public List<Product> getProducts(int categoryId) {
		return productDao.selectAllByCateGoryId(categoryId);
	}

	public List<Article> getArticles(int boardId) {
		return articleDao.selectAllByBoard(boardId);
	}

	public Board getBoard(Integer boardId, List<Board> list) {
		for (Board board : list) {
			if (boardId.equals(board.getId())) {
				return board;
			}
		}
		return null;
	}

	public Category getCategory(Integer categoryId, List<Category> categorys) {
		for (Category category : categorys) {
			if (categoryId.equals(category.getId())) {
				return category;
			}
		}
		return null;
	}

}
