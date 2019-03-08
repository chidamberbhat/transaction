package com.cbhat.monthly.runtime;

import org.springframework.stereotype.Component;

@Component
public class CurrentValues {
	
	private Double exchangeVal = 73.5;

	public Double getExchangeVal() {
		return exchangeVal;
	}

	public void setExchangeVal(Double exchangeVal) {
		this.exchangeVal = exchangeVal;
	}

}
