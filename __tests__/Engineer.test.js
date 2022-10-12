const Engineer = require('../lib/Engineer');


test('getRole returns engineer role', () => {
    const engineer = new Engineer("bob", 1234, "bob@gmail.com", "bob289");

    expect(engineer.getRole()).toBe("Engineer");
});

test('getGithub returns github username', () => {
    const engineer = new Engineer("bob", 1234, "bob@gmail.com", "bob289");

    expect(engineer.getGithub()).toBe("bob289");
});