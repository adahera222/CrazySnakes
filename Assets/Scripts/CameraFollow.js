#pragma strict

var cam:Camera;

function Start ()
{
	if(!networkView.isMine)
	{
		enabled = false;
	}
	
	var maincam = GameObject.Find("Main Camera");
	if(maincam.activeSelf == true)
		maincam.SetActive(false);
	cam = Instantiate(cam, maincam.transform.position, maincam.transform.rotation);
	cam.gameObject.SetActive(true);
	cam.transform.position.y = 20;
}

function Update ()
{
	cam.transform.position.x = this.transform.position.x;
	cam.transform.position.z = this.transform.position.z;
}