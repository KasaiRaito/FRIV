function startSudoku() {
    const container = document.getElementById('sudokuContainer');
    container.style.display = 'block';
    container.innerHTML = '';

    let grid = Array.from({length:9},()=>Array(9).fill(0));

    function isValid(num,row,col,gridCheck){
        for(let i=0;i<9;i++){
            if(gridCheck[row][i]===num && i!==col) return false;
            if(gridCheck[i][col]===num && i!==row) return false;
        }
        const startRow = Math.floor(row/3)*3;
        const startCol = Math.floor(col/3)*3;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(gridCheck[startRow+i][startCol+j]===num && (startRow+i!==row || startCol+j!==col)) return false;
            }
        }
        return true;
    }

    function fillGrid(){
        for(let row=0;row<9;row++){
            for(let col=0;col<9;col++){
                if(grid[row][col]===0){
                    let numbers=[1,2,3,4,5,6,7,8,9].sort(()=>Math.random()-0.5);
                    for(let num of numbers){
                        if(isValid(num,row,col,grid)){
                            grid[row][col]=num;
                            if(fillGrid()) return true;
                            grid[row][col]=0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    fillGrid();

    let attempts=40;
    while(attempts>0){
        let row=Math.floor(Math.random()*9);
        let col=Math.floor(Math.random()*9);
        if(grid[row][col]!==0){ grid[row][col]=0; attempts--; }
    }

    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    const inputs = [];

    for (let i = 0; i < 9; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const td = document.createElement('td');
            td.style.border = '1px solid #473a21';
            td.style.width = '40px';
            td.style.height = '40px';
            td.style.textAlign = 'center';

            if (grid[i][j] !== 0) {
                td.textContent = grid[i][j];
                td.style.fontWeight = 'bold';
            } else {
                const input = document.createElement('input');
                input.type = 'number';
                input.min = 1;
                input.max = 9;
                input.style.width = '38px';
                input.style.height = '38px';
                input.style.textAlign = 'center';
                td.appendChild(input);
                inputs.push({input,row:i,col:j});
            }

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    container.appendChild(table);

    // Check Solution button
    const button = document.createElement('button');
    button.textContent = "Check Solution";
    button.style.marginTop = "10px";
    container.appendChild(button);

    button.addEventListener('click', () => {
        const tempGrid = grid.map(row => row.slice());
        let allFilled = true;

        for(const {input,row,col} of inputs){
            const val = parseInt(input.value);
            if(isNaN(val)){
                allFilled = false;
                break;
            }
            tempGrid[row][col] = val;
        }

        if(!allFilled){
            alert("Please fill all empty cells first!");
            return;
        }

        let correct = true;
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                if(!isValid(tempGrid[i][j],i,j,tempGrid)){
                    correct = false;
                    if(grid[i][j]===0){
                        inputs.find(e=>e.row===i && e.col===j).input.style.backgroundColor="red";
                    }
                } else {
                    if(grid[i][j]===0){
                        inputs.find(e=>e.row===i && e.col===j).input.style.backgroundColor="white";
                    }
                }
            }
        }

        if(correct) alert("Congratulations! You solved it! 🎉");
        else alert("Some numbers are incorrect. Check highlighted cells.");
    });
}