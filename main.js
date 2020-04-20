Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
            default: false
        }

    },
    template: ` <div class="product">
    <div class="product-image">
        <img :src="image">
    </div>
    <div class="product-info">
        <h1> {{ title }}</h1> <!-- Acceder a una propiedad computada -->
        <p> {{ description }} </p>
        <p :style="inStock? ' ' : objectStyle ">The item is on sale.</p>
        <p>User is premium? {{ premium }} </p>
        <p>Shipping {{ shipping }} </p>
        <!-- Ejecutar verificación de if con base en el id-->
        <!-- Altera la propiedad css "visible" con base en el inventario-->
        <p v-show="inventory<=10 && inventory >0">Almost sold out.</p>
        <p>{{ itemOnSale }}</p>

        <div>
            <!-- Escucha a un clic y ejecuta "addToCart", se deshabilita en caso de que inStock sea falso y se aplica la clase disabled en el mismo caso -->
            <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton : !inStock }"> Add one to
                cart </button>

                <button v-on:click="unAddFromCart" :disabled="!inStock" :class="{ disabledButton : !inStock }"> Remove all from cart. </button>
            <!-- Botón con un listener para clics que agrega a la carta -->
            <!-- <button @click="unAddToCart">Unadd to cart</button> this was just a test-->
        </div>
        <productDetails :details="details"></productDetails>

        <h2> Variants: </h2>
        <!-- Un for que muestra cada variante -->
        <!-- Se mantiene una llave como referencia (:key) -->
        <!-- Se accede a un prop del elemento variant, siendo este variantColor -->
        <!-- se escucha a un mouseover para llamar a la función -->
        <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box"
            :style="{ backgroundColor : variant.variantColor }" @mouseover="updateProduct(index)">
        </div>

        <h2> Available sizes: </h2>
        <!-- Se inicia una lista desordenada -->
        <ul>
            <!-- For each, se mantiene la clave y se llenan los elementos de la lista -->
            <li v-for="size in sizes" :key="size.sizeId"> {{ size.sizeName }}</li>
        </ul>
    </div>
</div> `,
    data() {
        return {
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
                    variantQuantity: 7
                }

            ],
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
        }
    },
    methods: { //Aquí van los métodos; la notación usada podría no funcinar en todos los navegadores, pero... funciona en Firefox y Safari.
        updateProduct(index) {
            this.selectedVariant = index;
        },
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        unAddFromCart() {
            this.$emit('un-add-to-cart', this.variants[this.selectedVariant].variantId)
        }
    },
    computed: { //Propiedades computadas, el cálculo se realiza sólo cuando alguna dependencia cambia
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        itemOnSale() {
            if (this.variants[this.selectedVariant].variantQuantity > 0) {
                return 'From the ' + this.brand + ' brand, the item ' + this.product + ' is on sale'
            } else {
                return this.brand + "'s " + this.product + " aren't on sale."
            }
        },
        shipping() {
            if (this.premium) {
                return "Free"
            } else {
                return "$2.99"
            }
        }
    }
})

Vue.component('productDetails', {
    props: {
        details: {
            //type: Array,
            required: true
        }
    },
    template: `
    <div>
        <h2> Details: </h2>
        <ul>
            <!-- Se llenan los elementos de una lista con base en el contenido de details -->
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    </div>`

})
/*
    Se define un objeto Vue
*/
var app = new Vue({
    el: '#app', //Se define qué etiqueta utilizará Vue para anclarse en el DOM
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeCart(id) {
            this.cart = this.cart.filter(thing => thing != id);
        }
    }
}) 