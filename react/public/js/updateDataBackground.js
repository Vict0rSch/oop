function updateData() {
    // When updating this function, be sure to update its react counterpart
    if (!localStorage.data){
        fetchData(true);
        return
    }
    var ts2 = Math.round((new Date()).getTime() / 1000);
    if (localStorage.dataTime) {
        var ts = parseInt(localStorage.dataTime, 10);

        var checkEvery = 20;//3600 * 24; // 1 day
    }
    if ((!localStorage.dataTime || ts2 - ts > checkEvery) && localStorage.fetchingData !== 'true') {
        console.log('Looking for DB Update... (Background)');
        axios.get('https://oop-pro.herokuapp.com/public/update?timestamp=' + ts2).then(
            (response) => {
                console.log('Success (getting metadata data, Background)');
                const dataToUpdate = response.data;
                if (dataToUpdate.entities.length > 0 || dataToUpdate.edges.length >0) {
                    console.log('Updating data')
                    data = formatUpdateDataBackground(JSON.parse(localStorage.data), dataToUpdate);
                    localStorage.data = JSON.stringify(data);
                    localStorage.updateFromLocal = 'true';
                }
                localStorage.dataTime = Math.round((new Date()).getTime() / 1000);
            },
            (error) => {
                console.log('Server Error  (getting metadata data)');
                console.log(error);
            }).catch(
            (error) => {
                console.log('Catching JS Error (getting metadata data)');
                console.log(error);
            });
    }

}