package com.cbhat.monthly.dao;

import java.sql.Types;
import java.util.List;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.cbhat.monthly.entities.Transaction;

@Component
public class TransactionDao {
	
	private String insertTransactionSql = "INSERT INTO allmonthly.transaction (description, event_tag, " +
			"category, type, event_date, amount, amount_usd, currency, fin_account_from, " +
			"fin_account_to, last_modified) VALUES (:description, :event_tag, :category, :type, :event_date, " +
			":amount, :amount_usd, :currency, :fin_account_from, :fin_account_to, :last_modified);";
	
	private String selectAllTransactionSql = "SELECT id, description, event_tag, category, type, event_date, " +
			"amount, currency, fin_account_from, fin_account_to, last_modified FROM allmonthly.transaction;";
	
	@Autowired
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
	
	@Transactional (readOnly = false)
	public void insertTransaction(Transaction txn) {
		
		MapSqlParameterSource param = new MapSqlParameterSource();

		param.addValue("description", txn.getDescription())
			.addValue("event_tag", txn.getEventTag())
			.addValue("category", txn.getCategory())
			.addValue("type", txn.getType())
			.addValue("event_date", txn.getEventDate(), Types.DATE)
			.addValue("amount", txn.getAmount())
			.addValue("amount_usd", txn.getAmountUSD())
			.addValue("currency", txn.getCurrency())
			.addValue("fin_account_from", txn.getFinAccountFrom())
			.addValue("fin_account_to", txn.getFinAccountTo())
			.addValue("last_modified", new Date(), Types.DATE);
		
			namedParameterJdbcTemplate.update(insertTransactionSql, param);

	}
	
	@Transactional (readOnly = true)
	public List<Transaction> getAllTransactions() {
		
		return namedParameterJdbcTemplate.query(selectAllTransactionSql, new BeanPropertyRowMapper<>(Transaction.class));

	}

	@Transactional (readOnly = false)
	public void deleteTransaction(int txnId) {
		// TODO Auto-generated method stub
		
	}

	@Transactional (readOnly = true)
	public Transaction getTransaction(int txnId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Transactional (readOnly = false)
	public void updateTransaction(Transaction txn) {
		// TODO Auto-generated method stub
		
	}

}
