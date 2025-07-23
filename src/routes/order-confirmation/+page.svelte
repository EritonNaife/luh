<script lang="ts">
    import { page } from '$app/stores';
    import { selectedCurrency, formatPrice } from '$lib/stores/currency';
    import type { Order } from '$lib/types';
  
    let order: Order | null = null;
  
    $: orderId = $page.url.searchParams.get('orderId');
    $: if (orderId) {
      const orders = JSON.parse(localStorage.getItem('orders was') || '[]');
      order = orders.find((o: Order) => o.id === orderId) || null;
    }
  </script>
  
  <main class="p-8 max-w-2xl mx-auto">
    {#if order}
      <h1 class="text-2xl font-bold mb-4">Order Confirmation</h1>
      <p class="mb-4">Thank you for your order!</p>
      <div class="border border-gray-200 rounded-md p-4">
        <p class="mb-2"><strong>Order ID:</strong> {order.id}</p>
        <p class="mb-2">
          <strong>Delivery to:</strong> {order.delivery.firstName} {order.delivery.lastName}, 
          {order.delivery.address}{order.delivery.apartment ? `, ${order.delivery.apartment}` : ''}, 
          {order.delivery.postalCode} {order.delivery.region}, {order.delivery.country}
        </p>
        <p class="mb-4"><strong>Total:</strong> {formatPrice(order.total, $selectedCurrency)}</p>
        <h2 class="text-lg font-medium mb-2">Items:</h2>
        <ul class="list-disc pl-5">
          {#each order.items as item}
            <li>{item.name} × {item.quantity} - {formatPrice(item.price * item.quantity, $selectedCurrency)}</li>
          {/each}
        </ul>
      </div>
      <a href="/" class="mt-6 inline-block text-blue-600 hover:text-blue-700">Continue shopping</a>
    {:else}
      <p class="text-red-500">Order not found.</p>
    {/if}
  </main>