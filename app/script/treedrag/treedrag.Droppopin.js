/**
 *
 */

var Droppopin = function () {
  this.init.apply(this, arguments);
};

Droppopin.prototype = {
  constructor: Droppopin.prototype.constructor,
  options: {
  },

  init: function (options) {
    this.options = $.extend(true, {}, this.options, options);
    this.zones = this.options.zones;
    //this.zones.append('<div class="treedrag-zone-fog"></div>');
    this.addEvents();
    //this.createPopin();
    this.overrideDragDrop = $.proxy(this.overrideDragDrop, this);
  },

  dragdropResetEvents: function () {
    this.dragdropInstance.removeDropEvents();
    this.dragdropInstance.addDropEvents();
  },

  overrideDragDrop: function (dragDropInstance) {
    this.dragdropInstance = dragDropInstance;
    var _this = this;

    dragDropInstance.old_onDropInit = dragDropInstance.onDropInit;
    dragDropInstance.onDropInit = function (ev, dd) {
      var dragType = $(dd.drag).data("draggable-type");
      return dragType == $(dd.target).data('id') || dragType == $(dd.target).data("droppable-accept");
    };

    dragDropInstance.old_onDragEnd = dragDropInstance.onDragEnd;
    dragDropInstance.onDragEnd = function (ev, dd) {
      var drag = $(dd.drag);
      var zone = $(dd.drop);


      if (drag.data("level") == 2) {
        if (_this.currentZone && _this.currentZone.data('zone-id') == zone.data('zone-id')) return;
        var foundCat = zone.find('[data-id=' + drag.data('draggable-type') + ']');
        if (!foundCat.length) {
          //Si pas de cat trouvée dans la zone en question, on duplique la cat original, on la déplace dans la popin et
          // on laisse une copie sur la zone en cours, cela permet de garder tous les events sans se prendre la tête
          foundCat = $(dd.drag).data('original-parent').clone(true, true);
          foundCat.find('ul:first').children('li').not('.empty-droppable').remove();
          zone.append(foundCat);

        } /*else {
           foundCat = foundCat.parents('.treedrag-draggable').eq(0);
           foundCat.data('next-sibling', foundCat.next());
        }*/
        $(dd.drag).insertBefore(foundCat.find('.empty-droppable'));
        _this.currentDropCat = foundCat;
        _this.currentZone = zone;

        //zone.addClass('zone-isdraggable');
        //_this.open(zone);
      }

      _this.zones.find('.empty-droppable')
          .removeClass('active')
          .each(function () {
            $(this).appendTo($(this).parent());
          });
      _this.dragdropInstance.phantom.remove();

      //Class gestion
      $(dd.target).removeClass('treedrag-isdragging');

      /*

       if (_this.currentDropCat) {
       var nextSibling = _this.currentDropCat.data('next-sibling');
       if (nextSibling && nextSibling.length) {
       _this.currentDropCat.insertBefore(nextSibling);
       } else {
       _this.currentZone.append(_this.currentDropCat);
       }*/
      /*if (_this.dragInCatEnabled) {
       $(dd.drag).insertBefore(_this.currentDropCat.find('.empty-droppable'));
       $(dd.drag).css({
       left: 'auto',
       top: 'auto'
       });
       }*/
      //}


      //_this.close();

      _this.currentZone = null;
      _this.currentDropCat = null;
      _this.newCatHasBeenCreated = false;
      //_this.dragInCatEnabled = true;


      //dragDropInstance.old_onDragEnd(ev, dd);

    }
  },

  resetZonesIds: function () {
    this.zones.each(function () {
      var zone = $(this);
      zone.find('[data-zone-id]').attr('data-zone-id', zone.attr('data-id'));
    });
  },


  addEvents: function () {
    var _this = this;
    this.zones.drop('init', function (ev, dd) {
      if ($(dd.drag).data('level') == 1) return false;
      _this.dragInProgress = true;
      var res = $(dd.drag).data('zone-id') != $(dd.target).data('zone-id');
      return res;
    });
    this.zones.drop("start", function (ev, dd) {

    });

    this.zones.drop('end', function (ev, dd) {

    });
  }

  /*

   open: function (zone, dropParent) {
   $(zone).append(this.popin);
   this.popin.show();
   this.zones.removeClass('zone-isdraggable');
   zone.addClass('zone-isdraggable');
   this.popin.empty().append(this.currentDropCat);
   },
   */

  /*close: function () {
   if (this.popin) {
   this.popin.hide();
   }
   },
   */
  /*createPopin: function () {
   var _this = this;
   if (!this.popin) {
   this.popin = $('<div class="treedrag_droppopin"></div>').hide();
   this.popin.appendTo(this.zones[0]);
   this.popin.drop('init',function() {
   return true;
   });
   *//* this.popin.mouseenter(function () {
   _this.dragInCatEnabled = true;
   });*//*
   *//* this.popin.mouseleave(function () {
   _this.dragInCatEnabled = false;
   });
   this.popin.drop('init',function(ev,dd) {
   console.log("pouet");
   return true;
   });
   this.popin.drop(function(ev,dd) {
   console.log("popin drop start");
   });*//*
   }
   }*/
};
