async function buscarEndereco(cep) {
  var mensagemErro = document.getElementById('erro');
  mensagemErro.innerHTML = '';
  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaCEPConvertida = await consultaCEP.json();
    if (consultaCEPConvertida.erro) {
      throw Error('Esse CEP não existe!');
    }
    var cidade = document.getElementById('cidade');
    var logradouro = document.getElementById('endereco');
    var estado = document.getElementById('estado');
    var bairro = document.getElementById('bairro');

    cidade.value = consultaCEPConvertida.localidade;
    logradouro.value = consultaCEPConvertida.logradouro;
    estado.value = consultaCEPConvertida.uf;
    bairro.value = consultaCEPConvertida.bairro;
    console.log(consultaCEPConvertida);
    return consultaCEPConvertida;
  } catch (erro) {
    mensagemErro.innerHTML = `<p>CEP Inválido. Tente novamente! </p>`;
    console.log(erro);
  }
}

var cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscarEndereco(cep.value));

// let ceps = ['01001000', '01001001'];
// let conjuntoCeps = ceps.map((valores) => buscarEndereco(valores));
// console.log(conjuntoCeps);
// Promise.all(conjuntoCeps).then((respostas) => console.log(respostas));

// .then((resposta) => resposta.json())
// .then((r) => {
//   if (r.erro) {
//     throw Error('Esse CEP não existe');
//   } else console.log(r);
// })
// .catch((erro) => console.log(erro))
// .finally((mensagem) => console.log('Processamento concluido'));
