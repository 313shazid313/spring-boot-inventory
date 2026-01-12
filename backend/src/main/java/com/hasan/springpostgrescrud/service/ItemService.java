package com.hasan.springpostgrescrud.service;

import com.hasan.springpostgrescrud.entity.Item;
import java.util.List;

public interface ItemService {
    Item saveItem(Item item);
    Item updateItem(Item item);
    void deleteItem(Long id);
    Item getItemById(Long id);
    List<Item> getAllItems();
}
