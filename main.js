/*
    Se define un objeto Vue
*/
var app = new Vue({
    el: '#app', //Se define qué etiqueta utilizará Vue para anclarse en el DOM
    data: { //En esta parte va la información cruda.
        brand: 'Vue Mastery',
        product: 'Socks',
        selectedVariant: 0,
        description: "It's a sock",
        link: 'xtrs84zk.now.sh',
        onSale: true,
        objectStyle: { //apply styles with objects
            textDecoration: 'line-through'
        },
        inventory: 100,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./assets/image.png",
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./assets/image-blue.png",
                variantQuantity: 0
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
        updateProduct(index){
            this.selectedVariant = index;
        },
        addToCart(){
            this.cart += 1;
        },
        unAddToCart(){
            this.cart -= 1;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        itemOnSale(){
            if(this.onSale){
                return 'From the ' + this.brand  + ' brand, the item ' + this.product +  ' is on sale' 
            }
        }
    }
})