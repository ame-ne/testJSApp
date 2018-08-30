using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace testJSApp.Models
{
    interface IQuestionRepository
    {
        IQueryable<QuestionEntity> QuestionEntities { get; }
    }
}
