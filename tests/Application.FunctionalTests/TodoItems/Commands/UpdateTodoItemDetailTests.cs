using SkillSphere.Domain.Entities;
using SkillSphere.Application.TodoItems.Commands.CreateTodoItem;
using SkillSphere.Application.TodoItems.Commands.UpdateTodoItem;
using SkillSphere.Application.TodoItems.Commands.UpdateTodoItemDetail;
using SkillSphere.Application.TodoLists.Commands.CreateTodoList;

namespace SkillSphere.Application.FunctionalTests.TodoItems.Commands;

using static Testing;

public class UpdateTodoItemDetailTests : BaseTestFixture
{
    [Test]
    // NOT WORKING ! ! !

    public async Task ShouldRequireValidTodoItemId()
    {
        var command = new UpdateTodoItemCommand { Id = Guid.NewGuid(), Title = "New Title" };
        await FluentActions.Invoking(() => SendAsync(command)).Should().ThrowAsync<NotFoundException>();
    }

    [Test]
    public async Task ShouldUpdateTodoItem()
    {
        var userId = await RunAsDefaultUserAsync();

        var listId = await SendAsync(new CreateTodoListCommand { Title = "New List" });

        var itemId = await SendAsync(new CreateTodoItemCommand { ListId = listId, Title = "New Item" });

        var command = new UpdateTodoItemDetailCommand { Id = itemId, ListId = listId, Note = "This is the note.", };

        await SendAsync(command);

        var item = await FindAsync<TodoItem>(itemId);

        item.Should().NotBeNull();
        item!.ListId.Should().Be(command.ListId);
        item.Note.Should().Be(command.Note);
    }
}
