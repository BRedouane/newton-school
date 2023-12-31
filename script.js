let searchData = [];
let selectedItems = []; // Stocker les éléments sélectionnés

document.addEventListener('DOMContentLoaded', () => {
    fetch('../data.txt')
        .then(response => response.text())
        .then(text => {
            searchData = text.split('\n');
        })
        .catch(error => {
            console.error('Erreur lors du chargement de data.txt:', error);
        });

    document.getElementById('searchBox').addEventListener('input', () => {
        performRealTimeSearch();
    });

    document.getElementById('searchBtn').addEventListener('click', () => {
        const query = document.getElementById('searchBox').value;
        if (query) {
            selectSuggestion(query);
        }
    });
});

function performRealTimeSearch() {
    const query = document.getElementById('searchBox').value.toLowerCase();
    const suggestionsContainer = document.getElementById('results');
    const filteredData = searchData.filter(item => item.toLowerCase().includes(query));

    suggestionsContainer.innerHTML = '';
    filteredData.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item;
        div.classList.add('suggestion');
        div.onclick = () => selectSuggestion(item);
        suggestionsContainer.appendChild(div);
    });
}

function selectSuggestion(value) {
    document.getElementById('searchBox').value = '';
    document.getElementById('results').innerHTML = '';

    if (!selectedItems.includes(value)) {
        selectedItems.push(value);
        displaySelectedItem(value);
    }
}

function displaySelectedItem(value) {
    const container = document.getElementById('selectedItems');
    const itemDiv = document.createElement('div');
    itemDiv.textContent = value;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.onclick = () => removeSelectedItem(value, itemDiv);

    itemDiv.appendChild(removeBtn);

    // Ajoute l'élément au début de la liste (comportement de pile)
    container.insertBefore(itemDiv, container.firstChild);
}

function removeSelectedItem(value, itemDiv) {
    selectedItems = selectedItems.filter(item => item !== value);
    itemDiv.remove();
}
