// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];


let cartData;
let data = JSON.parse(sessionStorage.getItem("appData"));
if(data){
	cartData = data;
}
else{
	cartData=[];
}


// DOM elements
const productList = document.getElementById("product-list");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
 addEventListnersToButton();	
}

function addEventListnersToButton(){
	const addButtons = document.querySelectorAll(".add-to-cart-btn");

	addButtons.forEach((btn)=>{
		btn.addEventListener('click',(e)=>{
			let cartid= e.target.getAttribute("data-id");
			addToCart(cartid);
		})
	})
}

function addEventListnersToCartButton(){
	const cartButtons = document.querySelectorAll(".cart-btn");
   
	cartButtons.forEach((btn)=>{
		btn.addEventListener('click',(e)=>{
			let cartid= e.target.getAttribute("data-cartid");
			removeFromCart(cartid);
		});
	});
	 console.log(cartButtons);
}
document.getElementById("clear-cart-btn").addEventListener('click',clearCart);


// Render cart list
function renderCart() {
       document.getElementById("cart-list").innerHTML = "";

       sessionStorage.setItem("appData",JSON.stringify(cartData));
	
       if(cartData.length < 1){return };
	  
	   cartData.forEach((product)=>{
		const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} <button class="cart-btn" data-cartid="${product.id}">remove from Cart</button>`;
		 document.getElementById("cart-list").append(li);
	});	

	addEventListnersToCartButton();
}

// Add item to cart
function addToCart(productId) {
	// product.id -> integer  and productId = string
	let arr = products.filter((product)=>product.id === parseInt(productId));
	cartData.push(arr[0]);

	renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
	
	// product.id -> integer  and productId = string
    cartData = cartData.filter((product)=>product.id !== parseInt(productId));
	
	renderCart();

}

// Clear cart
function clearCart() {
	cartData = [];
	renderCart();
}

// Initial render
renderProducts();
cartData.length >0 && renderCart();
