package com.module4.casestudy.controllers;

import com.module4.casestudy.model.Category;
import com.module4.casestudy.model.Product;
import com.module4.casestudy.service.category.ICategoryService;
import com.module4.casestudy.service.product.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private Environment environment;
    @Autowired
    private IProductService productService;
    @Autowired
    private ICategoryService categoryService;

    @ModelAttribute("categories")
    public List<Category> categories() {
        return categoryService.findALl();
    }

    @GetMapping("")
    public ModelAndView getAll(@PageableDefault(size = 5) Pageable pageable) {
        Page<Product> products = productService.findALl(pageable);
        ModelAndView modelAndView = new ModelAndView("shop/product/list");
        modelAndView.addObject("products", products);
        return modelAndView;
    }
    @GetMapping("/create")
    public ModelAndView showCreate() {
        ModelAndView modelAndView = new ModelAndView("shop/product/create");
        modelAndView.addObject("products", new Product());
        return modelAndView;
    }

    @PostMapping("/create")
    public ModelAndView create(@Validated @ModelAttribute Product product, BindingResult bindingResult) throws IOException {
        if (bindingResult.hasFieldErrors()) {
            ModelAndView modelAndView = new ModelAndView("shop/product/create");
            return modelAndView;
        }
        MultipartFile imageMul = product.getImageMul();
        String image = imageMul.getOriginalFilename();
        String resource = environment.getProperty("upload.path").toString();
        FileCopyUtils.copy(imageMul.getBytes(), new File(resource + image));
        product.setImage(image);
        productService.save(product);
        ModelAndView modelAndView = new ModelAndView("shop/product/create", "products", new Product());
        modelAndView.addObject("mess", "Tao moi thanh cong product ten la " + product.getName());
        return modelAndView;
    }
}
