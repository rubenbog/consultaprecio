// Load the data from a text file
async function loadData() {
    const response = await fetch('PRLISTA.txt');
    const data = await response.text();
    return data.split('\n')
        .map(line => line.trim()) // Elimina espacios en blanco alrededor de cada línea
        .filter(line => line.includes(';')) // Solo líneas con formato válido
        .map(line => {
            const [codigo, descripcion, precio] = line.split(';');
            return { 
                codigo: codigo.trim().toUpperCase(), 
                descripcion: descripcion.trim().toUpperCase(), 
                precio: precio.trim() 
            };
        });
}

// Search function
function searchProducts(products, query) {
    const keywords = query.toUpperCase().split(' '); // Split query into keywords
    return products.filter(product => {
        return keywords.every(keyword => 
            product.codigo.includes(keyword) ||
            product.descripcion.includes(keyword)
        );
    });
}

// Display results
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('result-item');
        div.innerHTML = `<strong>${product.descripcion}</strong> (Code: ${product.codigo}) - $${product.precio}`;
        resultsDiv.appendChild(div);
    });
}

// Main function
async function main() {
    const products = await loadData();
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        const results = searchProducts(products, query);
        displayResults(results);
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        const results = searchProducts(products, query);
        displayResults(results);
    });
}

// Initialize the app
main();
