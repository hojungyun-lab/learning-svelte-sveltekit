interface CartItem {
    id: number; name: string; price: number; quantity: number;
}

class CartState {
    items = $state<CartItem[]>([]);

    get total(): number {
        return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    }
    get count(): number {
        return this.items.reduce((sum, i) => sum + i.quantity, 0);
    }

    add(product: { id: number; name: string; price: number }) {
        const existing = this.items.find(i => i.id === product.id);
        if (existing) { existing.quantity++; }
        else { this.items.push({ ...product, quantity: 1 }); }
    }

    remove(id: number) { this.items = this.items.filter(i => i.id !== id); }

    updateQuantity(id: number, qty: number) {
        const item = this.items.find(i => i.id === id);
        if (item) { qty <= 0 ? this.remove(id) : item.quantity = qty; }
    }

    clear() { this.items = []; }
}

export const cart = new CartState();
