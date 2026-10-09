package com.gaurav.delicia.config;

import com.gaurav.delicia.model.Product;
import com.gaurav.delicia.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedProducts(ProductRepository repo) {
        return args -> {
            if (repo.count() > 0) return;
            repo.saveAll(List.of(
                    cake("Classic Chocolate Truffle", "Birthday", "Chocolate", false, "1kg", 599,
                            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop", 4.6, true),

                    cake("Red Velvet Dream", "Birthday", "Red Velvet", false, "1kg", 749,
                            "https://images.unsplash.com/photo-1616690710400-a16d146927c5?w=500&h=400&fit=crop", 4.8, true),

                    cake("Vanilla Bean Bliss", "Birthday", "Vanilla", true, "0.5kg", 449,
                            "https://images.unsplash.com/photo-1607478900766-efe13248b125?w=500&h=400&fit=crop", 4.3, false),

                    cake("Black Forest Special", "Birthday", "Black Forest", false, "1kg", 649,
                            "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&h=400&fit=crop", 4.7, false),

                    cake("Butterscotch Crunch", "Birthday", "Butterscotch", true, "1kg", 599,
                            "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&h=400&fit=crop", 4.4, false),

                    cake("Two-Tier Wedding Elegance", "Wedding", "Vanilla", false, "3kg", 2999,
                            "https://images.unsplash.com/photo-1519654793190-2301e8d0e3f7?w=500&h=400&fit=crop", 4.9, true),

                    cake("Rose Gold Anniversary", "Anniversary", "Red Velvet", false, "2kg", 1899,
                            "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=500&h=400&fit=crop", 4.8, false),

                    cake("Golden Couple Cake", "Anniversary", "Chocolate", false, "2kg", 1749,
                            "https://images.unsplash.com/photo-1522767131594-6b7e96e94b6c?w=500&h=400&fit=crop", 4.5, false),

                    cake("Chocolate Cupcake Box (6pc)", "Cupcakes", "Chocolate", false, "300g", 349,
                            "https://images.unsplash.com/photo-1607478900766-efe13248b125?w=500&h=400&fit=crop", 4.2, false),

                    cake("Rainbow Sprinkle Cupcakes (6pc)", "Cupcakes", "Vanilla", true, "300g", 379,
                            "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=500&h=400&fit=crop", 4.6, true),

                    cake("Eggless Fresh Fruit Cake", "Birthday", "Fruit", true, "1kg", 699,
                            "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=500&h=400&fit=crop", 4.4, false),

                    cake("Pineapple Paradise", "Birthday", "Pineapple", true, "1kg", 549,
                            "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&h=400&fit=crop", 4.3, false)
            ));

            System.out.println("✅ Seeded 12 sample products into delicia.products");
        };
    }

    private Product cake(String name, String category, String flavour, boolean eggless,
                         String weight, double price, String imageUrl, double rating, boolean featured) {
        Product p = new Product();
        p.setName(name);
        p.setCategory(category);
        p.setFlavour(flavour);
        p.setEggless(eggless);
        p.setWeight(weight);
        p.setPrice(BigDecimal.valueOf(price));
        p.setImageUrl(imageUrl);
        p.setRating(rating);
        p.setFeatured(featured);
        p.setAvailable(true);
        p.setStore("Delicia Central");
        return p;
    }
}