package com.cbhat.monthly.dao;

import java.sql.Types;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.cbhat.monthly.entities.Account;

@Component
public class AccountsDao {
	
	private String insertAccountSql = "INSERT INTO allmonthly.accounts ( owner_id, name, currency, "
			+ "category, type, url, username, password, last_modified ) VALUES ( :owner_id, :name, "
			+ ":currency, :category, :type, :url, :username, :password, :last_modified );";
	
	private String selectAllAccountsSql = "SELECT name, currency, category, type, url, username,"
			+ " password, last_modified FROM allmonthly.accounts";
	
	@Autowired
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
	
	@Transactional (readOnly = false)
	public void insertAccount(Account account) {
		
		MapSqlParameterSource param = new MapSqlParameterSource();
		
		param.addValue("owner_id", account.getOwnerId())
				.addValue("name", account.getName())
				.addValue("currency", account.getCurrency())
				.addValue("category", account.getCategory())
				.addValue("type", account.getType())
				.addValue("url", account.getUrl())
				.addValue("username", account.getUsername())
				.addValue("password", account.getPassword())
				.addValue("last_modified", new Date(), Types.DATE);
			
		namedParameterJdbcTemplate.update(insertAccountSql, param);

	}

	public void updateAccount(Account account) {
		// TODO Auto-generated method stub
		
	}

	public void deleteAccount(String accountName) {
		// TODO Auto-generated method stub
		
	}

	public Account getAccount(String accountName) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Account> getAllAccounts() {

		return namedParameterJdbcTemplate.query(selectAllAccountsSql, new BeanPropertyRowMapper<>(Account.class));

	}

}
