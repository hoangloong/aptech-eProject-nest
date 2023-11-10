import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { PaymentsModule } from './payments/payments.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductAttributesModule } from './product-attributes/product-attributes.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    CategoriesModule,
    ProductsModule,
    WishlistModule,
    CartModule,
    OrdersModule,
    CustomersModule,
    ShipmentsModule,
    PaymentsModule,
    OrderItemsModule,
    AuthModule,
    UsersModule,
    ProductAttributesModule,
    ProductImagesModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
