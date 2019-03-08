package com.cbhat.monthly.contoller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cbhat.monthly.dao.AccountsDao;
import com.cbhat.monthly.entities.Account;

@RestController
@RequestMapping(path="/accounts")
public class AccountsController {
	
	@Autowired
	private AccountsDao accountsDao;

	@PostMapping(path="/add")
	public void addOwner(@RequestBody Account account) {
		accountsDao.insertAccount(account);
	}

	@PatchMapping(path="/update")
	public void updateOwner(@RequestBody Account account) {
		accountsDao.updateAccount(account);
	}

	@DeleteMapping(path="/delete/{accountName}")
	public void deleteOwner(@PathVariable String accountName) {
		accountsDao.deleteAccount(accountName);
	}

	@GetMapping(path="/get/{accountName}")
	public Account getOwner(@PathVariable String accountName) {
		return accountsDao.getAccount(accountName);
	}

	@GetMapping("/getAll")
	public List<Account> addAccounts() {
		return accountsDao.getAllAccounts();
	}
	
}
