# Activity 6: Student API

## Instructions

Create a backend that returns student entries from a Student DB

## Features

Business logic to calculate the 'status' column:

- If a student passed and no debt: Approved
- If a student failed and no debt: Pending
- If a student passed and debt: Reestructure
- If a student failed and debt: Expelled

## Types

### StudentAPI

```json
{
  "id": "A01750536",
  "name": "Fernando",
  "status": "Approved"
}
```

### Student

```json
{
  "id": "A01750536",
  "name": "Fernando",
  "status": "Approved",
  "grade": 88.1,
  "debt": 100.0
}
```

## Endpoints

### `api/students`

```json
[
  StudentAPI student1,
  StudentAPI student2
]
```
