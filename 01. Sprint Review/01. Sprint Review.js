function solve(input) {
    const n = input.shift()
    const board = [];

    for (let i = 0; i < n; i++) {
        const [assignee, taskId, title, status, points] = input.shift().split(':')
        if (!board.hasOwnProperty(assignee)) {
            board[assignee] = [];
        }
        board[assignee].push({ taskId, title, status, points: Number(points) })
    }

    while (input.length > 0) {
        let line = input.shift()
        const tokens = line.split(':');
        const task = tokens[0];
        const assignee = tokens[1];

        switch (task) {
            case 'Add New':
                if (checkForAssignee(assignee)) {
                    const [taskId, title, status, points] = tokens.slice(2)
                    board[assignee].push({ taskId, title, status, points: Number(points) })
                }
                break;
            case 'Change Status':
                if (checkForAssignee(assignee)) {
                    const taskId = tokens[2];
                    const newStatus = tokens[3];
                    const task = board[assignee].find((t) => t.taskId === taskId);
                    if (task) {
                        task.status = newStatus;
                    } else {
                        console.log(`Task with ID ${taskId} does not exist for ${assignee}!`);
                    }
                }
                break;
            case 'Remove Task':
                if (checkForAssignee(assignee)) {
                    const index = Number(tokens[2]);
                    if (index < 0 || index >= board[assignee].length) {
                        console.log("Index is out of range!");
                        break;
                    }
                    board[assignee].splice(index, 1)
                }
                break;
            default:
                break;
        }
    }
    const toDoPoints = getTotalPointsForStatus('ToDo');
    const inProgresPoints = getTotalPointsForStatus('In Progress');
    const codeReviewPoints = getTotalPointsForStatus('Code Review');
    const donePoints = getTotalPointsForStatus('Done');
    console.log(`ToDo: ${toDoPoints}pts`);
    console.log(`In Progress: ${inProgresPoints}pts`);
    console.log(`Code Review: ${codeReviewPoints}pts`);
    console.log(`Done Points: ${donePoints}pts`);
    const unfinishedPointsSum = toDoPoints + inProgresPoints + codeReviewPoints;

    if (donePoints >= unfinishedPointsSum) {
        console.log('Sprint was successful!');
    } else {
        console.log('Sprint was unsuccessful...')
    }


    function getTotalPointsForStatus(status) {
        return Object.values(board)
            .reduce((totalPointsSum, tasks) => {
                return totalPointsSum + tasks
                .filter((t) => t.status === status)
                .map((t) => t.points)
                .reduce((a, b) => a + b, 0);
            }, 0);
    }
    function checkForAssignee(assignee) {
        const isExisting = board.hasOwnProperty(assignee);
        if (!isExisting) {
            console.log(`Assignee ${assignee} does not exist on the board!`);
        }

        return isExisting;
    }

}
solve([
    '5',
    'Kiril:BOP-1209:Fix Minor Bug:ToDo:3',
    'Mariya:BOP-1210:Fix Major Bug:In Progress:3',
    'Peter:BOP-1211:POC:Code Review:5',
    'Georgi:BOP-1212:Investigation Task:Done:2',
    'Mariya:BOP-1213:New Account Page:In Progress:13',
    'Add New:Kiril:BOP-1217:Add Info Page:In Progress:5',
    'Change Status:Peter:BOP-1290:ToDo',
    'Remove Task:Mariya:1',
    'Remove Task:Joro:1',
])
/* solve(  [
    '4',
    'Kiril:BOP-1213:Fix Typo:Done:1',
    'Peter:BOP-1214:New Products Page:In Progress:2',
    'Mariya:BOP-1215:Setup Routing:ToDo:8',
    'Georgi:BOP-1216:Add Business Card:Code Review:3',
    'Add New:Sam:BOP-1237:Testing Home Page:Done:3',
    'Change Status:Georgi:BOP-1216:Done',
    'Change Status:Will:BOP-1212:In Progress',
    'Remove Task:Georgi:3',
    'Change Status:Mariya:BOP-1215:Done',
]) */