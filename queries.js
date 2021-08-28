const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'niharika',
  host: '127.0.0.1',
  database: 'database_development',
  password: 'abcd1234',
  port: 5432,
});

const createEmployee = (request, response) => {
    const {id,fn,ln,jd,sal,dept} = request.body;
  
    pool.query('INSERT INTO data."EMPLOYEES"("FIRST_NAME", "LAST_NAME", "JOINING_DATE", "EMP_ID", "SALARY", "DEPARTMENT") VALUES ($1,$2,$3,$4,$5,$6)', [fn,ln,jd,id,sal,dept], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`);
    });
  };

const list_distinct_departments = (request, response) => {
    pool.query('select distinct("DEPARTMENT") from data."EMPLOYEES"', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows);
    });
  };

  const getall = (request, response) => {
    pool.query('select * from data."EMPLOYEES"', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows);
    });
  };

  const salary_above_tenlakhs = (request, response) => {
    pool.query(`select * from data."EMPLOYEES" where "DEPARTMENT"='HR' and "SALARY">1000000`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows);
    });
  };

  const updateEmployee = (request, response) => {
    const id = parseInt(request.params.id)
    const { FIRST_NAME,LAST_NAME,JOINING_DATE,SALARY,DEPARTMENT } = request.body
    pool.query(
      'UPDATE data."EMPLOYEES" SET "FIRST_NAME"=$1, "LAST_NAME"=$2, "JOINING_DATE"=$3, "SALARY"=$4, "DEPARTMENT"=$5 where "EMP_ID" = $6',
      [FIRST_NAME,LAST_NAME,JOINING_DATE,SALARY,DEPARTMENT,id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`);
      }
    );
  };

  const deleteDepartment = (request, response) => {
    pool.query('DELETE FROM data."EMPLOYEES" WHERE "FIRST_NAME"is null and "LAST_NAME" is null', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`departments deleted`);
    });
  };

module.exports = { 
    createEmployee,
    list_distinct_departments,
    salary_above_tenlakhs,
    updateEmployee,
    deleteDepartment,
    getall
    };

