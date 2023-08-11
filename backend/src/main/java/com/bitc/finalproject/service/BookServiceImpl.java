package com.bitc.finalproject.service;

import com.bitc.finalproject.dto.ProductItem;
import com.bitc.finalproject.dto.ProductObject;
import com.bitc.finalproject.dto.SearchItemDto;
import com.bitc.finalproject.dto.SearchItemObject;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;


@Service
public class BookServiceImpl implements BookService {

    @Override
    public ProductObject getItemList(String url) throws Exception {

        List<ProductItem> itemList = null;
        Integer TotalCount = null;
        URL urlContainer = null;
        HttpURLConnection urlConnection = null;
        BufferedReader reader = null;

        try {
            urlContainer = new URL(url);
            urlConnection = (HttpURLConnection) urlContainer.openConnection();
            urlConnection.setRequestMethod("GET");

            reader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));

            StringBuilder stringBuilder = new StringBuilder();
            String item;

            while ((item = reader.readLine()) != null) {
                stringBuilder.append(item);
            }

            Gson gson = new Gson();

            ProductObject productObject = gson.fromJson(stringBuilder.toString(), ProductObject.class);
            itemList = productObject.getItem();
            TotalCount = productObject.getTotalResults();
         }
        catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            if (reader != null) {
                reader.close();
            }
            if (urlConnection != null) {
                urlConnection.disconnect();
            }
        }

        ProductObject productObject = new ProductObject();
        productObject.setTotalResults(TotalCount);
        productObject.setItem(itemList);

        return productObject;
    }

    @Override
    public List<SearchItemDto> getItemList2(String url) throws Exception {
        List<SearchItemDto> itemList2 = null;
        URL urlContainer = null;
        HttpURLConnection urlConnection = null;
        BufferedReader reader = null;
        try {
            urlContainer = new URL(url);
            urlConnection = (HttpURLConnection) urlContainer.openConnection();
            urlConnection.setRequestMethod("GET");

            reader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));

            StringBuilder stringBuilder = new StringBuilder();
            String item;

            while ((item = reader.readLine()) != null) {
                stringBuilder.append(item);
            }
            Gson gson = new Gson();
            SearchItemObject searchItemObject = gson.fromJson(stringBuilder.toString(), SearchItemObject.class);
            itemList2 = searchItemObject.getItem();
        } catch (Exception e) {
            e.printStackTrace();

        } finally {
            if (reader != null) {
                reader.close();
            }
            if (urlConnection != null) {
                urlConnection.disconnect();
            }
        }
        return itemList2;
    }
}
