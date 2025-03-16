(function () {
  var elInput, elOutput;
  elInput = document.getElementById("input");
  elOutput = document.getElementById("output");
  elInput.oninput = function (e) {
    return (elOutput.innerHTML = (function (it) {
      return (elOutput.innerHTML = it);
    })(
      (function (it) {
        return it.join("<br>");
      })(
        (function (it) {
          return it.map(function (it) {
            return '"' + it + '",';
          });
        })(
          (function (it) {
            return it.filter(function (it) {
              return !!it;
            });
          })(
            (function (it) {
              return it.map(function (it) {
                return it.trim();
              });
            })(
              (function (it) {
                return it.split("\n");
              })(e.target.value),
            ),
          ),
        ),
      ),
    ));
  };
}).call(this);
