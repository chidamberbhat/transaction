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

import com.cbhat.monthly.dao.TransactionDao;
import com.cbhat.monthly.entities.Transaction;

@RestController
@RequestMapping(path="/transaction")
public class TransactionController {
	
	@Autowired
	private TransactionDao transactionDao;

	@PostMapping(path="/add")
	public void addTranscation(@RequestBody Transaction txn) {
		transactionDao.insertTransaction(txn);
	}

	@PatchMapping(path="/update")
	public void updateTranscation(@RequestBody Transaction txn) {
		transactionDao.updateTransaction(txn);
	}

	@DeleteMapping(path="/delete/{txnId}")
	public void deleteTranscation(@PathVariable int txnId) {
		transactionDao.deleteTransaction(txnId);
	}

	@GetMapping(path="/get/{txnId}")
	public Transaction getTranscation(@PathVariable int txnId) {
		return transactionDao.getTransaction(txnId);
	}

	@GetMapping("/getAll")
	public List<Transaction> addTranscation() {
		return transactionDao.getAllTransactions();
	}
	
}
