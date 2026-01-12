package com.hasan.springpostgrescrud.service;

import com.hasan.springpostgrescrud.entity.Item;
import com.hasan.springpostgrescrud.repository.ItemRepository;
// import com.hasan.springpostgrescrud.service.ItemService;
import org.springframework.stereotype.Service;

import java.util.List;
// import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }

    @Override
    public Item updateItem(Item item) {
        return itemRepository.save(item);
    }

    @Override
    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }

    @Override
    public Item getItemById(Long id) {
        return itemRepository.findById(id).orElse(null);
    }

    @Override
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }
}
