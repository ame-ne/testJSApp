using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testJSApp.Models;

namespace testJSApp.Services
{
    interface ITestService
    {
        int TestInit();
        QuestionEntity GetNext();
    }
}
