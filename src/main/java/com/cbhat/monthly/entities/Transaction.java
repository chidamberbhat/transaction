package com.cbhat.monthly.entities;

import java.util.Date;

public class Transaction {

    private Integer id;
	
	private String description;
	private String eventTag;
	private String category;
	private String type;
	private Date eventDate;
	private Date lastModified;
	private Double amount;
	private Double amountUSD;
	private String currency;
	private String finAccountFrom;
	private String finAccountTo;

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getEventTag() {
		return eventTag;
	}
	public void setEventTag(String eventTag) {
		this.eventTag = eventTag;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Date getEventDate() {
		return eventDate;
	}
	public void setEventDate(Date eventDate) {
		this.eventDate = eventDate;
	}
	public Date getLastModified() {
		return lastModified;
	}
	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public Double getAmountUSD() {
		return amountUSD;
	}
	public void setAmountUSD(Double amountUSD) {
		this.amountUSD = amountUSD;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public String getFinAccountFrom() {
		return finAccountFrom;
	}
	public void setFinAccountFrom(String finEntityFrom) {
		this.finAccountFrom = finEntityFrom;
	}
	public String getFinAccountTo() {
		return finAccountTo;
	}
	public void setFinAccountTo(String finEntityTo) {
		this.finAccountTo = finEntityTo;
	}
	
}
