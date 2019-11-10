from rest_framework import serializers
from .models import Customer, Investment, Stock


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
            model = Customer
            fields = ('pk','name', 'address', 'cust_number', 'city', 'state', 'zipcode', 'email', 'email', 'cell_phone')

class InvestmentSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.name', read_only=True)

    class Meta:
            model = Investment
            fields = ('pk','customer_name', 'category', 'description', 'acquired_value', 'acquired_date', 'recent_value', 'recent_date')


class StockSerializer(serializers.ModelSerializer):

    class Meta:
            model = Stock
            fields = ('pk','customer', 'symbol', 'name', 'shares', 'purchase_price', 'purchase_date')
