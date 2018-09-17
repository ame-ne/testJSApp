using System.Linq;

namespace testJSApp.Models
{
    public interface ITestService
    {
        IQueryable<QuestionEntity> QuestionEntities { get; }

        int TestInit();
        QuestionEntity GetNext(int id);
    }
}
