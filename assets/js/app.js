const cl = console.log;

const userNameform = document.getElementById("userNameform");
const userNameControl = document.getElementById("userNameControl");
const usercontainer = document.getElementById("usercontainer");

const BASE_URL = `https://api.github.com/users`;

const makeApiCall = async (apiurl) =>{
    const res = await fetch(apiurl);
    return await res.json();
}

const templatingofuserCard = (arr) => {
    let result = " ";

    let reporesult = " ";

    arr[1].forEach((ele,i) => {
        if( i < 5){
            reporesult += `<a href="${ele.url}" target="_blank" class="repocss">${ele.name}</a>`
        }
        
    });

    result = `<div class="row">
                    <div class="col-md-6 offset-md-3">
                        <div class="form-group cardcss">
                            <figure class="user-card">
                                <div class="avatar-img">
                                 <img src="${arr[0].avatar_url}" title="avatar-img" alt="avatar-img">
                                </div>
                                <figcaption class="userinfo">
                                    <h3>${arr[0].name}</h3>
                                    <p>
                                    <span>${arr[0].following}</span>
                                    <span class="spancss">Following</span>
                                    <span>${arr[0].followers}</span>
                                    
                                    <span class="spancss">Followers</span>
                                    <span>${arr[0].public_repos}</span>
                                    
                                    <span>Repo</span>
                                    </p>
                                    <p>
                                    ${reporesult} 
                                    </p>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>`

usercontainer.innerHTML = result;
}

const onAdduser = async (eve) => {
    eve.preventDefault();
    let userName = userNameControl.value;

    let userurl = `${BASE_URL}/${userName}`;
    let userrepourl = `${BASE_URL}/${userName}/repos`;
    // cl(userrepourl)

    let arrofPromises = [makeApiCall(userurl), makeApiCall(userrepourl)];

    let data = await Promise.all(arrofPromises);
    templatingofuserCard(data)
}






userNameform.addEventListener("submit", onAdduser)