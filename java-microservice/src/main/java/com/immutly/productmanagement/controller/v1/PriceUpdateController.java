package com.immutly.productmanagement.controller.v1;


import com.immutly.productmanagement.dto.ApiResponse;
import com.immutly.productmanagement.model.Product;
import com.immutly.productmanagement.service.PriceUpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1")
public class PriceUpdateController {
    private final PriceUpdateService priceUpdateService;

    @Autowired
    public PriceUpdateController(PriceUpdateService priceUpdateService) {
        this.priceUpdateService = priceUpdateService;
    }

    @PatchMapping("/price-update")
    public ApiResponse handlePriceUpdate(
            @RequestParam String prodId,
            @RequestParam double newPrice
    ) {
        ApiResponse apiResponse = priceUpdateService.processPriceUpdate(prodId, newPrice);
        return  apiResponse;
    }

}
