const KEY_BD = '@usuariosestudo1'


var listaRegistros = {
    ultimoIdGerado: 0,
    usuarios: []
}


var FILTRO = ''


function gravarBD() {
    localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros))
}

function lerBD() {
    const data = localStorage.getItem(KEY_BD)
    if (data) {
        listaRegistros = JSON.parse(data)
    }
    desenhar()
}


function pesquisar(value) {
    FILTRO = value;
    desenhar()
}


function desenhar() {
    const tbody = document.getElementById('listaRegistrosBody')
    if (tbody) {
        var data = listaRegistros.usuarios;
        if (FILTRO.trim()) {
            const expReg = eval(`/${FILTRO.trim().replace(/[^\d\w]+/g, '.*')}/i`)
            data = data.filter(usuario => {
                return expReg.test(usuario.nome)
            })
        }
        data = data
            .sort((a, b) => {
                return a.nome < b.nome ? -1 : 1
            })
            .map(usuario => {
                return `<tr style='text-align: center;'>
                        <td style='width: 10px;'>
                            <i onclick='vizualizar("cadastro",false,${usuario.id})' class="fa-sharp fa-solid fa-pen"></i>
                            <i style='margin-left: 30px;' onclick='perguntarSeDeleta(${usuario.id})' class="fa-sharp fa-solid fa-trash"></i>
                        </td>
                        <td style='width: 20px; '>${usuario.id}</td>
                        <td style='width: 170px;'>${usuario.nome}</td>
                        <td style='width: 150px;'>${usuario.end}</td>
                        <td style='width: 15px;'>${usuario.datanasc}</td>
                    </tr>`
            })
        tbody.innerHTML = data.join('')
    }
}

function insertUsuario(nome, end, datanasc) {
    const id = listaRegistros.ultimoIdGerado + 1; // alterar numero do idgerado
    listaRegistros.ultimoIdGerado = id;
    listaRegistros.usuarios.push({
        id, nome, end, datanasc
    })
    gravarBD()
    desenhar()
    vizualizar('lista')
}

function editUsuario(id, nome, end, datanasc) {
    var usuario = listaRegistros.usuarios.find(usuario => usuario.id == id)
    usuario.nome = nome;
    usuario.end = end;
    usuario.datanasc = datanasc;
    gravarBD()
    desenhar()
    vizualizar('lista')
}

function deleteUsuario(id) {
    listaRegistros.usuarios = listaRegistros.usuarios.filter(usuario => {
        return usuario.id != id // deixar === para conseguir deixar só o que clicou para deletar
    })
    gravarBD()
    desenhar()
}

function perguntarSeDeleta(id) {
    if (confirm('Quer deletar o registro de id' + id)) {
        deleteUsuario(id)
    }
}

function limparEdicao() {
    document.getElementById('nome').value = ''
    document.getElementById('end').value = ''
    document.getElementById('datanasc').value = ''
}

function vizualizar(pagina, novo = false, id = null) {
    document.body.setAttribute('page', pagina)
    if (pagina === 'cadastro') {
        if (novo) limparEdicao()
        if (id) {
            const usuario = listaRegistros.usuarios.find(usuario => usuario.id == id)
            if (usuario) {
                document.getElementById('id').value = usuario.id
                document.getElementById('nome').value = usuario.nome
                document.getElementById('end').value = usuario.end
                document.getElementById('datanasc').value = usuario.datanasc
            }
        }
        document.getElementById('nome').focus()
    }
}



function submeter(e) {
    e.preventDefault()
    const data = {
        id: document.getElementById('id').value,
        nome: document.getElementById('nome').value,
        end: document.getElementById('end').value,
        datanasc: document.getElementById('datanasc').value,
    }
    if (data.id) {
        editUsuario(data.id, data.nome, data.end, data.datanasc) // alterar o nome de data.fone
    } else {
        insertUsuario(data.nome, data.end, data.datanasc)
    }
}


window.addEventListener('load', () => {
    lerBD()
    document.getElementById('cadastroRegistro').addEventListener('submit', submeter)
    document.getElementById('inputPesquisa').addEventListener('keyup', e => {
        pesquisar(e.target.value)
    })

})