#pragma strict

var mainCamera:Camera;

function Start () {

}

function Update () {
	if(Input.GetMouseButtonDown(0))
	{
		var hit:RaycastHit;
		var objlist:GameObject[];
		var objv:ClickToMove;

		//if(this.gameObject.collider.Raycast(mainCamera.ScreenPointToRay(Input.mousePosition),hit))
		if(Physics.Raycast(mainCamera.ScreenPointToRay(Input.mousePosition),hit))
		{
			if(hit.transform.tag == "Player")
			{
				objlist = GameObject.FindGameObjectsWithTag("Player");
				for(var obj : GameObject in objlist)
				{
					objv = obj.GetComponent(ClickToMove);
					objv.isSelected = false;
				}
				var objvars:ClickToMove = hit.transform.gameObject.GetComponent(ClickToMove);
				objvars.isSelected = !objvars.isSelected;
			}
			else
			{
				objlist = GameObject.FindGameObjectsWithTag("Player");
				for(var obj : GameObject in objlist)
				{
					objv = obj.GetComponent(ClickToMove);
					objv.isSelected = false;
				}
			}
		}
		else
		{
			objlist = GameObject.FindGameObjectsWithTag("Player");
			for(var obj : GameObject in objlist)
			{
				objv = obj.GetComponent(ClickToMove);
				objv.isSelected = false;
			}
		}
	}
}