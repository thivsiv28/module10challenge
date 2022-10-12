const Employee = require('../lib/Employee');

test('getName returns employee name', () => {
    const employee = new Employee("bob", 1234, "bob@gmail.com");

    expect(employee.getName()).toBe("bob");
});

test('getId returns employee id', () => {
    const employee = new Employee("bob", 1234, "bob@gmail.com");

    expect(employee.getId()).toBe(1234);
});

test('getEmail returns employee email', () => {
    const employee = new Employee("bob", 1234, "bob@gmail.com");

    expect(employee.getEmail()).toBe("bob@gmail.com");
});
test('getRole returns employee role', () => {
    const employee = new Employee("bob", 1234, "bob@gmail.com");

    expect(employee.getRole()).toBe("Employee");
});
