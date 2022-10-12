const Manager = require('../lib/Manager');

test('getRole returns manager role', () => {
    const manager = new Manager("bob", 1234, "bob@gmail.com", 1234);

    expect(manager.getRole()).toBe("Manager");
});

test('officeNumber is set', () => {
    const manager = new Manager("bob", 1234, "bob@gmail.com", 1234567);

    expect(manager.officeNumber).toBe(1234567);
});
