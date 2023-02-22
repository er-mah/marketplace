const PythonShell = require("python-shell");


const getToken = (req, res) => {
    PythonShell.run('service-account.py', { scriptPath: __dirname, pythonPath: '/usr/bin/python' }, (err, results) => {
        if (err) throw err;
        res.status(200).send({ status: 'ok', message: results });
    });
};