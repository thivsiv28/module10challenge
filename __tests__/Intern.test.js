const Intern = require('../lib/Intern');



test('getRole returns intern role', () => {
    const intern = new Intern("bob", 1234, "bob@gmail.com", "school name");

    expect(intern.getRole()).toBe("Intern");
});

test('getSchool returns school name', () => {
    const intern = new Intern("bob", 1234, "bob@gmail.com", "school name");

    expect(intern.getSchool()).toBe("school name");
});
