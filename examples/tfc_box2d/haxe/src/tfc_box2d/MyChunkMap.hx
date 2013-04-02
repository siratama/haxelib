package tfc_box2d;
import com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil;
import com.dango_itimi.toolkit_for_createjs.box2d.fla.ChunkForJS;
import createjs.easeljs.MovieClip;
import com.dango_itimi.box2d.fla.ChunkMap;

class MyChunkMap extends ChunkMap{

	private var chunkMapContainer:MovieClip;

	//box
	public static inline var ID_BOX_BACKGROUND:Int = 0;
	public static inline var ID_CHARACTER:Int = 1;

	//circle
	public static inline var ID_CIRCLE:Int = 0;
	public static inline var ID_CIRCLE2:Int = 1;

	//polygon
	public static inline var ID_FLIPPER:Int = 0;

	//groupIndex
	private static inline var GROUP_CIRCLE:Int = -1;

	public function initialize(chunkMapContainer:MovieClip) {

		this.chunkMapContainer = chunkMapContainer;

		initializeForBox();
		initializeForCircle();
		initializeForPolygon();
	}
	private function initializeForBox() {

		boxSet[ID_BOX_BACKGROUND] = new ChunkForJS(ContainerUtil.getProperty(chunkMapContainer, "boxBackground"), false, false, 0, 1);
		boxSet[ID_CHARACTER] = new ChunkForJS(ContainerUtil.getProperty(chunkMapContainer, "character"), true, false, 1, 1, 1, false);
	}
	private function initializeForCircle() {

		circleSet[ID_CIRCLE] = new ChunkForJS(ContainerUtil.getProperty(chunkMapContainer, "circleTest"), false, true, 1, 0, 1, false, GROUP_CIRCLE);
		circleSet[ID_CIRCLE2] = new ChunkForJS(ContainerUtil.getProperty(chunkMapContainer, "circleTest2"), true, true, 1, 0.5, 1, false, GROUP_CIRCLE);
	}
	private function initializeForPolygon() {

		polygonSet[ID_FLIPPER] = new ChunkForJS(ContainerUtil.getProperty(chunkMapContainer, "flipper"), true, true, 1, 0, 1, false);
	}
}
