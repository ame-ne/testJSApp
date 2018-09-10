using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace testJSApp.Models
{
    public interface ITestService
    {
        IQueryable<QuestionEntity> QuestionEntities { get; }

        int TestInit();
        QuestionEntity GetNext();
    }
}
