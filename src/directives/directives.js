// Движение цены(визуально)
export const priceMovement = {
    mounted(el, binding) {
        const value = binding.value.toString();
        const classList = el.classList;

        if (value.startsWith("-")) {
            classList.add("downward-price-movement");

        } else {
            classList.add("upward-price-movement");
        }
    },
    updated(el, binding) {
        const value = binding.value.toString();
        const classList = el.classList;

        // Обнуление
        classList.remove("upward-price-movement");
        classList.remove("downward-price-movement");

        if (value.startsWith("-")) {
            classList.add("downward-price-movement");

        } else {
            classList.add("upward-price-movement");
        }
    }
}