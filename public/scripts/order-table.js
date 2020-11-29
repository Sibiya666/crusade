const recruitTableHtml = document.querySelector('.recruit-table');

recruitTableHtml.addEventListener('click', async (event) => {
    if (!event.target.classList.contains('btn-remove')) {
        return;
    }

    const id = event.target.dataset.id;

    const res = await (await fetch(`/recruit/remove/${id}`, { method: 'delete' })).json();

    
    console.log(res)
    if (res.recruit.length) {

        const newBodyTable = res.recruit.map(row => {
            return `<tr>`
            <td>${row.name}</td>
            <td>${row.count}</td>
            <td>
                <button class="btn btn-small btn-remove" data-id="${row.id}">delete</button>
            </td>
        </tr>`
        }).join('');

        recruitTableHtml.querySelector('tbody').innerHTML = newBodyTable;
    } else {
        document.querySelector('.container').innerHTML = '<h3> No assembled Crusade</h3>'
    }

//     res.
//     const updateTable = `        <thead>
//     <td>Name</td>
//     <td>Count</td>
//     <td>Change</td>
// </thead>
// {{#each order.recruit}}
// <tr>
//     <td>{{name}}</td>
//     <td>{{count}}</td>
//     <td>
//         <button class="btn btn-small btn-remove" data-id="{{id}}">delete</button>
//     </td>
// </tr>`

})