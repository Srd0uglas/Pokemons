// PEGANDO A CLASS .POKEMON_NAME E JOGANDO NA VARIÁVEL pokemonNAME
const pokemonName = document.querySelector('.pokemon_name');
// PEGANDO A CLASS .POKEMON_NUMBER E JOGANDO NA VARIÁVEL pokemonNumber
const pokemonNumber = document.querySelector('.pokemon_number');
// PEGANDO A CLASS .POKEMON_IMAGE E JOGANDO NA VARIÁVEL pokemonImage
const pokemonImage = document.querySelector('.pokemon_image');


const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

// ESSE ATRIBUTO É RESPONSÃVEL PELA APARIÇÃO DO 1º POKEMON
let searchPokemon = 1;

// FUNÇÃO PARA FAZER A BUSCA DOS POKEMONS
// A MINHA FECHPOKEMON VAI BUSCAR AS INFO DO POKEMON QUE EU QUERO
const fetchPokemon = async (pokemon) => {

const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
// CONDIÇÃO PARA TRATAR O ERRO DE POKEMON QUE NÃO EXISTE 
    if(APIresponse.status === 200){
// PEGAR A RESPOSTA DA API E EXTRAIR EM JSON
    const data = await APIresponse.json()
    return data;
    }
}
// FUNÇAÕ PARA PEGAR OS DADOS DA FUNÇÃO ANTERIOR E EXIBIR NA TELA
const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
  
    const data = await fetchPokemon(pokemon);

    // CONDIÇÃO PARA TRATAR O ERRO DE POKEMON QUE NÃO EXISTE 
    if(data){
    pokemonImage.style.display = "block";
    // o .name é da API e representa o nome do pokemon
    pokemonName.innerHTML = data.name;
    // o .id é da API e representa o id do pokemon
    pokemonNumber.innerHTML = data.id;
    // CAMINHO PARA COLOCAR O GIF 
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    // APÓS DIGITAR O NOME DO POKEMON O INPUT VAI LIMPAR 
    input.value='';
    searchPokemon = data.id;
}else{
    // ESSE ATRIBUTO FAZ COM QUE A FOTO SUMA SE NÃO HOUVER UM POKEMON COM O NOME/ID DIGITADO
    pokemonImage.style.display='none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
}
}
// FUNÇAÕ PARA PEGAR OS DADOS DO FORM E FAZER A PESQUISA
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});
buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon-=1;
        renderPokemon(searchPokemon);
    }
});
buttonNext.addEventListener('click', () => {
    searchPokemon +=1;
    renderPokemon(searchPokemon);
});

// ESSE ATRIBUTO FAZ COM QUE O PRIMEIRO POKEMON SEJA EXIBIDO NA TELA
renderPokemon(searchPokemon);
