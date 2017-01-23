var tagbox = $("#tagBox").selectize({
    plugins: ["remove_button", "restore_on_backspace"],
    create: true,
    persist: true,
    preload: true,
    openOnFocus: true,
    delimiter: " ",
    sortField: "name",
    render: {
        item: function (data, escape) {
            return "<div>" + _.capitalize(escape(data.text)) + "</div>";
        }
    },
    create: function (input, callback) {
        var options = tagbox[0].selectize.options;
        var found = false;
        Object.keys(options).map(function (item) {
            if (options[item].text === input && !found) {
                alert("Tag already exists");
                found = true;
            };
        });
        if (found) callback();
        else {
            var newTagKey = firebase.database().ref().child("tags/en/").push().key;
            var newTag = {};
            newTag["tags/en/" + newTagKey] = { name: input };
            firebase.database().ref().update(newTag, callback({ value: newTagKey, text: input }));
        };
    },
    load: function (query, callback) {
        $.get("https://trankilo-a6266.firebaseio.com/tags.json", function (data) {
            callback(Object.keys(data.en).map(function (e) {
                return { value: `${e}###${data.en[e].name}`, text: `${data.en[e].name}` }
            }));
        });
    }
});

$(".sampleBox").selectize({
    render: {
        item: function (data, escape) {
            return "<div>" + _.capitalize(escape(data.text)) + "</div>";
        }
    }
});