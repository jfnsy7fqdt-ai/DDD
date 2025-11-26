// Mock product dataset — replace with headless API or CMS
export const products = [
  {
    id: "nimbus-hoodie",
    title: "Nimbus Hoodie",
    price: 79,
    images: [
      "https://images.unsplash.com/photo-1520975661060-3a7f56a6c2f1?w=1400&q=60&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1400&q=60&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342452485-86d0e6d48a76?w=1400&q=60&auto=format&fit=crop"
    ],
    color: ["black", "stone"],
    size: ["XS","S","M","L","XL"],
    description: "Premium brushed cotton hoodie. Oversized fit. Limited drop."
  },
  {
    id: "axis-tee",
    title: "Axis Tee",
    price: 29,
    images: [
      "https://images.unsplash.com/photo-1542060748-5c5b17e6d7d1?w=1400&q=60&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1400&q=60&auto=format&fit=crop"
    ],
    color: ["white","black"],
    size: ["XS","S","M","L"],
    description: "Soft cotton tee with structured shoulders."
  },
  {
    id: "orbit-jacket",
    title: "Orbit Jacket",
    price: 139,
    images: [
      "https://images.unsplash.com/photo-1503342452485-86d0e6d48a76?w=1400&q=60&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520975661060-3a7f56a6c2f1?w=1400&q=60&auto=format&fit=crop"
    ],
    color: ["olive","navy"],
    size: ["S","M","L"],
    description: "Weather-resistant shell with technical lining."
  }
];

export function findProductById(id) {
  return products.find((p) => p.id === id);
}