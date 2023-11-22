using SkillSphere.Domain.Entities;
using SkillSphere.Application.TodoItems.Commands.CreateTodoItem;
using SkillSphere.Application.TodoItems.Commands.DeleteTodoItem;
using SkillSphere.Application.TodoLists.Commands.CreateTodoList;

namespace SkillSphere.Application.FunctionalTests.TodoItems.Commands;

using static Testing;

public class DeleteTodoItemTests : BaseTestFixture
{
    [Test]
    // NOT WORKING ! ! !
    public async Task ShouldRequireValidTodoItemId()
    {
        var command = new DeleteTodoItemCommand(Guid.NewGuid());

        await FluentActions.Invoking(() =>
            SendAsync(command)).Should().ThrowAsync<NotFoundException>();
    }

    [Test]
    public async Task ShouldDeleteTodoItem()
    {
        var listId = await SendAsync(new CreateTodoListCommand
        {
            Title = "New List"
        });

        var itemId = await SendAsync(new CreateTodoItemCommand
        {
            ListId = listId,
            Title = "New Item"
        });

        await SendAsync(new DeleteTodoItemCommand(itemId));

        var item = await FindAsync<TodoItem>(itemId);

        item.Should().BeNull();
    }
}
