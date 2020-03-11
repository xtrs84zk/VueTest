/*
    Se define un objeto Vue
*/
var app = new Vue({
    el: '#app', //Se define qué etiqueta utilizará Vue para anclarse en el DOM
    data: { //En esta parte va la información cruda.
        product: 'Socks',
        description: "It's a sock",
        image: './assets/image.png',
        link: 'xtrs84zk.now.sh',
        inStock: true,
        noStockClass: 'text-decoration: line-through',
        inventory: 100,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./assets/image.png"
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./assets/image-blue.png"
            }

        ],
        cart: 0,
        sizes: [
            {
                sizeId: 1234,
                sizeName: "big"
            },
            {
                sizeId: 1235,
                sizeName: "extra-big"
            },
            {
                sizeId: 1236,
                sizeName: "extra-extra-big"
            }
        ],
    },
    methods: { //Aquí van los métodos; la notación usada podría no funcinar en todos los navegadores, pero... funciona en Firefox y Safari.
        updateProduct(variantImage){
            this.image = variantImage;
        },
        addToCart(){
            this.cart += 1;
        },
        unAddToCart(){
            this.cart -= 1;
        }
    }
})